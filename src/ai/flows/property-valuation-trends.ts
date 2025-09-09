'use server';

/**
 * @fileOverview An AI agent for providing property valuation trends based on location and property characteristics.
 *
 * - getPropertyValuationTrends - A function that handles the property valuation trends process.
 * - GetPropertyValuationTrendsInput - The input type for the getPropertyValuationTrends function.
 * - GetPropertyValuationTrendsOutput - The return type for the getPropertyValuationTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetPropertyValuationTrendsInputSchema = z.object({
  location: z.string().describe('The location of the property.'),
  propertyCharacteristics: z
    .string()
    .describe(
      'The characteristics of the property, such as size, number of bedrooms, and age.'
    ),
});
export type GetPropertyValuationTrendsInput = z.infer<
  typeof GetPropertyValuationTrendsInputSchema
>;

const GetPropertyValuationTrendsOutputSchema = z.object({
  valuationTrends: z
    .string()
    .describe(
      'A description of the valuation trends for the property, including factors influencing the trends.'
    ),
  interactiveChartData: z
    .string()
    .describe(
      'Data suitable for rendering an interactive chart of neighborhood valuation trends over time, in JSON format.'
    ),
});
export type GetPropertyValuationTrendsOutput = z.infer<
  typeof GetPropertyValuationTrendsOutputSchema
>;

export async function getPropertyValuationTrends(
  input: GetPropertyValuationTrendsInput
): Promise<GetPropertyValuationTrendsOutput> {
  return getPropertyValuationTrendsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getPropertyValuationTrendsPrompt',
  input: {schema: GetPropertyValuationTrendsInputSchema},
  output: {schema: GetPropertyValuationTrendsOutputSchema},
  prompt: `You are a real estate investment expert. Provide a valuation trend report for the specified property.  Include factors influencing the trends.

Location: {{{location}}}
Property Characteristics: {{{propertyCharacteristics}}}

Provide data suitable for an interactive chart of neighborhood valuation trends over time.  The chart data should be provided in JSON format.
`,
});

const getPropertyValuationTrendsFlow = ai.defineFlow(
  {
    name: 'getPropertyValuationTrendsFlow',
    inputSchema: GetPropertyValuationTrendsInputSchema,
    outputSchema: GetPropertyValuationTrendsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
