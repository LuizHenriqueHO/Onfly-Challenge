import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		icon: 'file:random.svg',
		group: ['transform'],
		version: 1,
		description: 'Generates a true random number using the Random.org API',
		defaults: {
			name: 'Random',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'True Random Number Generator',
						value: 'generate',
						description: 'Generate a random integer',
						action: 'Generate a random integer',
					},
				],
				default: 'generate',
			},
			{
				displayName: 'Min',
				name: 'min',
				type: 'number',
				required: true,
				default: 1,
				description: 'The minimum value for the random number (inclusive)',
			},
			{
				displayName: 'Max',
				name: 'max',
				type: 'number',
				required: true,
				default: 100,
				description: 'The maximum value for the random number (inclusive)',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const min = this.getNodeParameter('min', i, 1) as number;
				const max = this.getNodeParameter('max', i, 100) as number;
				const apiUrl = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

				const response = (await this.helpers.httpRequest({
					method: 'GET',
					url: apiUrl,
					encoding: 'text',
					json: false,
				})) as string;

				const randomNumber = parseInt(response.trim(), 10);

				if (isNaN(randomNumber)) {
					throw new Error('Random.org API did not return a valid number.');
				}

				const newItem: INodeExecutionData = {
					json: {
						...items[i].json,
						randomNumber: randomNumber,
					},
					pairedItem: { item: i },
				};
				returnData.push(newItem);
			} catch (error) {
				let errorMessage = 'An unknown error occurred';
				if (error instanceof Error) {
					errorMessage = error.message;
				}

				if (this.continueOnFail()) {
					returnData.push({ json: { error: errorMessage }, pairedItem: { item: i } });
					continue;
				}
				throw error;
			}
		}
		return this.prepareOutputData(returnData);
	}
}