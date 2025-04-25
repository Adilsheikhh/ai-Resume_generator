import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Try to parse the request body
    let resume;
    try {
      const body = await request.json();
      resume = body.resume;
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }

    if (!resume) {
      return NextResponse.json({ error: 'Resume content is required' }, { status: 400 });
    }

    // Try OpenAI API first if the key is available
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    
    if (OPENAI_API_KEY) {
      try {
        return await enhanceWithOpenAI(resume, OPENAI_API_KEY);
      } catch (openaiError) {
        console.error('OpenAI API error:', openaiError);
        // Fall back to Gemini if OpenAI fails
      }
    }
    
    // Fall back to Gemini API
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ 
        error: 'No AI API keys available. Configure either OPENAI_API_KEY or GEMINI_API_KEY.' 
      }, { status: 500 });
    }
    
    try {
      return await enhanceWithGemini(resume, GEMINI_API_KEY);
    } catch (geminiError) {
      console.error('Gemini API error:', geminiError);
      // If both APIs fail, return the original resume with an error message
      return NextResponse.json({ 
        enhancedResume: resume,
        error: 'Failed to enhance resume. AI services are currently unavailable.' 
      }, { status: 500 });
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'An error occurred while enhancing the resume' }, { status: 500 });
  }
}

async function enhanceWithOpenAI(resume: any, apiKey: string) {
  try {
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    
    const prompt = `Improve the professionalism and clarity of the following resume. 
Make the language more impactful and professional, and enhance the formatting and organization.
Input resume:
${JSON.stringify(resume, null, 2)}

Return ONLY a valid JSON object with the same structure as the input, with your improved content.`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a professional resume writer who helps improve resumes." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error from OpenAI API:', errorData);
      return NextResponse.json({ 
        error: `Failed to enhance resume with OpenAI: ${response.status} ${response.statusText}` 
      }, { status: 500 });
    }

    const responseData = await response.json();
    
    if (!responseData.choices || !responseData.choices[0] || !responseData.choices[0].message) {
      console.error('Unexpected OpenAI response structure:', JSON.stringify(responseData));
      return NextResponse.json({ error: 'Invalid response from OpenAI' }, { status: 500 });
    }
    
    const enhancedText = responseData.choices[0].message.content;
    
    // Parse the response
    try {
      // Try to extract JSON 
      const jsonMatch = enhancedText.match(/```json\s*([\s\S]*?)\s*```/) || 
                        enhancedText.match(/\{[\s\S]*\}/);
                        
      const jsonStr = jsonMatch ? jsonMatch[0] : enhancedText;
      const enhancedResume = JSON.parse(jsonStr.replace(/```json|```/g, '').trim());
      
      return NextResponse.json({ enhancedResume });
    } catch (parseError) {
      console.error('Error parsing enhanced resume JSON from OpenAI:', parseError);
      console.error('Raw text received:', enhancedText);
      
      // Fallback
      return NextResponse.json({
        enhancedResume: resume,
        enhancementText: enhancedText,
        error: 'Could not parse the enhanced resume from OpenAI'
      });
    }
  } catch (error) {
    console.error('Error using OpenAI API:', error);
    throw error;
  }
}

// Simplified approach to handling JSON in the API response
async function enhanceWithGemini(resume: any, apiKey: string) {
  try {
    // Use the successful model directly: gemini-1.5-pro-latest
    const modelName = "gemini-1.5-pro-latest";
    const apiVersion = "v1beta";
    const endpoint = `https://generativelanguage.googleapis.com/${apiVersion}/models/${modelName}:generateContent?key=${apiKey}`;
    
    console.log(`Trying endpoint: ${endpoint}`);
    
    const prompt = `Improve the professionalism and clarity of the following resume:
${JSON.stringify(resume, null, 2)}

Return the enhanced resume as a valid JSON object with the same structure as the input.
IMPORTANT:
1. Do not include any comments in the JSON
2. Use only valid JSON syntax
3. Make sure all property names and string values are in double quotes
4. No trailing commas
5. Return ONLY valid, parseable JSON`;

    // Format the request for v1beta API
    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.2, // Lower temperature for more consistent JSON output
        topP: 0.8,
        topK: 40
      }
    };
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Model ${modelName} failed:`, errorText);
      return NextResponse.json({ 
        error: `Failed to enhance resume with Gemini model ${modelName}.` 
      }, { status: 500 });
    }
    
    console.log(`Successfully used model: ${modelName}`);
    const responseData = await response.json();
    
    // Extract the response text from Gemini's response structure
    let enhancedResumeText = '';
    
    // Handle v1beta response format
    if (responseData.candidates && 
        responseData.candidates[0] && 
        responseData.candidates[0].content && 
        responseData.candidates[0].content.parts && 
        responseData.candidates[0].content.parts[0] && 
        responseData.candidates[0].content.parts[0].text) {
      enhancedResumeText = responseData.candidates[0].content.parts[0].text;
    } 
    else {
      console.error('Unexpected response structure from Gemini:', JSON.stringify(responseData));
      return NextResponse.json({ 
        error: 'Invalid response structure from Gemini AI',
        responseData: responseData 
      }, { status: 500 });
    }
    
    // Log the raw response
    console.log('Raw response text:', enhancedResumeText);
    
    // Extract JSON from the response text - look for content between markdown code blocks
    const jsonMatch = enhancedResumeText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    
    let jsonStr = '';
    if (jsonMatch && jsonMatch[1]) {
      jsonStr = jsonMatch[1];
    } else {
      // If not in code blocks, try to find the JSON object directly
      const objectMatch = enhancedResumeText.match(/(\{[\s\S]*\})/);
      if (objectMatch && objectMatch[1]) {
        jsonStr = objectMatch[1];
      } else {
        return NextResponse.json({
          enhancedResume: resume,
          error: "Could not extract JSON from the AI response"
        });
      }
    }
    
    // Try to parse the JSON
    try {
      const enhancedResume = JSON.parse(jsonStr);
      return NextResponse.json({ enhancedResume });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      
      // Fallback to original resume
      return NextResponse.json({
        enhancedResume: resume,
        error: "Could not parse the enhanced resume JSON"
      });
    }
  } catch (error) {
    console.error('Error using Gemini API:', error);
    throw error;
  }
}

// Enhanced JSON cleaning logic to handle missing commas and improperly formatted strings
function cleanAndParseJSON(jsonString: string): any {
  try {
    // Add missing commas between properties
    jsonString = jsonString.replace(/"\s*([a-zA-Z0-9_]+)\s*"\s*:/g, '"$1":');
    jsonString = jsonString.replace(/}(\s*){/g, '},{');

    // Fix improperly formatted strings
    jsonString = jsonString.replace(/"([^"\n]+)\s*([^"\n]+)"/g, '"$1, $2"');

    // Ensure all keys and values are properly quoted
    jsonString = jsonString.replace(/([a-zA-Z0-9_]+)\s*:/g, '"$1":');

    // Remove trailing commas
    jsonString = jsonString.replace(/,\s*([}\]])/g, '$1');

    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error cleaning and parsing JSON:', error);
    throw new Error('Invalid JSON format');
  }
}

// Function to discover available Gemini models
async function discoverGeminiModels(apiKey: string) {
  const apiVersions = ['v1', 'v1beta', 'v1beta1', 'v1beta2', 'v1beta3'];
  const modelResults: any[] = [];
  
  for (const version of apiVersions) {
    try {
      const listModelsUrl = `https://generativelanguage.googleapis.com/${version}/models?key=${apiKey}`;
      
      console.log(`Trying to list models with API version: ${version}`);
      const response = await fetch(listModelsUrl);
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.models && Array.isArray(data.models)) {
          // Filter for text generation models
          const textModels = data.models.filter((model: any) => {
            const modelName = model.name || '';
            const displayName = model.displayName || '';
            const supportedGenerationMethods = model.supportedGenerationMethods || [];
            
            // Filter for gemini models that support content generation
            return (modelName.includes('gemini') || displayName.includes('Gemini')) && 
                  (supportedGenerationMethods.includes('generateContent') || 
                   supportedGenerationMethods.includes('generateText'));
          });
          
          if (textModels.length > 0) {
            console.log(`Found ${textModels.length} Gemini models in ${version}`);
            
            // Add these models to our results with their API version
            textModels.forEach((model: any) => {
              modelResults.push({
                name: model.name.split('/').pop(), // Extract just the model name without the prefix
                displayName: model.displayName,
                apiVersion: version,
                supportedGenerationMethods: model.supportedGenerationMethods
              });
            });
          }
        }
      }
    } catch (error) {
      console.error(`Error listing models for ${version}:`, error);
    }
  }
  
  return modelResults;
}
