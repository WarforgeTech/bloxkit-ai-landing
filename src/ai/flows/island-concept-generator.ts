'use server';

/**
 * @fileOverview An AI agent for generating Fortnite island concepts.
 *
 * - islandConceptGenerator - A function that generates island concept ideas based on a text prompt.
 * - IslandConceptGeneratorInput - The input type for the islandConceptGenerator function.
 * - IslandConceptGeneratorOutput - The return type for the islandConceptGenerator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IslandConceptGeneratorInputSchema = z.object({
  prompt: z.string().describe('A description of the type of Fortnite island to create.'),
});
export type IslandConceptGeneratorInput = z.infer<typeof IslandConceptGeneratorInputSchema>;

const IslandConceptGeneratorOutputSchema = z.object({
  concepts: z
    .array(z.object({title: z.string(), description: z.string()}))
    .describe('A list of island concepts, each with a title and description.'),
});
export type IslandConceptGeneratorOutput = z.infer<typeof IslandConceptGeneratorOutputSchema>;

export async function islandConceptGenerator(input: IslandConceptGeneratorInput): Promise<IslandConceptGeneratorOutput> {
  return islandConceptGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'islandConceptGeneratorPrompt',
  input: {schema: IslandConceptGeneratorInputSchema},
  output: {schema: IslandConceptGeneratorOutputSchema},
  prompt: `You are a creative consultant for Fortnite island designs. Generate 3 distinct island concepts based on the following description: {{{prompt}}}. Each concept should have a title and a brief description.

Output the concepts in JSON format:
{
  "concepts": [
    { "title": "Concept 1 Title", "description": "Concept 1 Description" },
    { "title": "Concept 2 Title", "description": "Concept 2 Description" },
    { "title": "Concept 3 Title", "description": "Concept 3 Description" }
  ]
}`,
});

const islandConceptGeneratorFlow = ai.defineFlow(
  {
    name: 'islandConceptGeneratorFlow',
    inputSchema: IslandConceptGeneratorInputSchema,
    outputSchema: IslandConceptGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
