
export const budgetCategoryJsonSchema = {
    type: 'object',
    properties: {
      categoryId: { type: 'string' },
      amount: { type: 'number', min: 0 },
      progress: { type: 'number', min: 0 },
    },
}

export const budgetCategoriesJsonSchema = {
    type: 'array',
    items: budgetCategoryJsonSchema,
}