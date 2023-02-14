import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function (req, res)
{
    if (!configuration.apiKey)
    {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured, please follow instructions in README.md",
            }
        });
        return;
    }

    const molecule = req.body.molecule || '';
    if (molecule.trim().length === 0)
    {
        res.status(400).json({
            error: {
                message: "Please enter a valid molecule",
            }
        });
        return;
    }

    try
    {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            // model: "text-ada-001	",
            prompt: generatePrompt(molecule),
            temperature: 0.2,
            max_tokens: 150,
        });
        res.status(200).json({ result: completion.data.choices[0].text });
    } catch (error)
    {
        // Consider adjusting the error handling logic for your use case
        if (error.response)
        {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else
        {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
}

function generatePrompt(molecule)
{
    const capitalizedMolecule =
        molecule[0].toUpperCase() + molecule.slice(1).toLowerCase();
    return `Give a description of the chemical compound ${molecule}`

}


// Animal: Cat
// Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
// Animal: Dog
// Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
// Animal: ${capitalizedAnimal}
// Names:`;