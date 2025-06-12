import * as z from 'zod';

export const schoolSearchSchema = z.object({
  query: z
    .string()
    .min(2, { message: 'School search must be at least 2 characters long' })
    .optional(),

  district: z
    .union([
      z.array(
        z
          .string()
          .nonempty({ message: 'Each district must be a non-empty string' }),
      ),
      z.string().nonempty({ message: 'District must be a non-empty string' }),
    ])
    .optional(),

  school_status: z.string().optional(),

  school_type: z.string().optional(),

  sector_name: z.string().optional(),

  cell_name: z.string().optional(),

  combination_ids: z
    .union([
      z.array(
        z.string().length(24, {
          message:
            'Each Combination ID must be exactly 24 hexadecimal characters',
        }),
      ),
      z.string().length(24, {
        message: 'Combination ID must be exactly 24 hexadecimal characters',
      }),
    ])
    .optional(),

  page: z
    .number()
    .int()
    .min(1, { message: 'Page must be at least 1' })
    .optional(),

  limit: z
    .number()
    .int()
    .min(1, { message: 'Limit must be at least 1' })
    .optional(),
});

export type SearchSchoolFields = z.infer<typeof schoolSearchSchema>;
