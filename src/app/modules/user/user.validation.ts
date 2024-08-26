import z from "zod";

const userNameValidationSchema = z.object({
  firstName: z.string({
    invalid_type_error: "First name should be a string",
    required_error: "Firstname is required",
  }),
  middleName: z.string().optional(),
  lastName: z.string({
    invalid_type_error: "Lastname should be a string",
    required_error: "Lastname is required",
  }),
});

// create user validations schema
const createUserValidationsSchema = z.object({
  body: z.object({
    name: userNameValidationSchema,
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),
    password: z.string().optional(),
    age: z.number({
      invalid_type_error: "Age should be a number",
      required_error: "Age is required",
    }),
    contact: z.string({
      invalid_type_error: "Contact should be a string",
      required_error: "Contact number is required",
    }),
    address: z.string({
      invalid_type_error: "Address should be a string",
      required_error: "Address is required",
    }),
  }),
});

// update user name validation schema
const updateUserNameValidationSchema = userNameValidationSchema.partial();

// update user validations schema
const updateUserValidationsSchema = z.object({
  body: z.object({
    name: updateUserNameValidationSchema.optional(),
    age: z
      .number({
        invalid_type_error: "Age should be a number",
        required_error: "Age is required",
      })
      .optional(),
    contact: z
      .string({
        invalid_type_error: "Contact should be a string",
        required_error: "Contact number is required",
      })
      .optional(),
    address: z
      .string({
        invalid_type_error: "Address should be a string",
        required_error: "Address is required",
      })
      .optional(),
  }),
});

export const UserValidations = {
  createUserValidationsSchema,
  updateUserValidationsSchema,
};
