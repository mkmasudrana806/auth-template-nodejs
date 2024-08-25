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
    password: z.string().optional(),
    user: z.object({
      name: userNameValidationSchema,
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Invalid email address"),
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
  }),
});

export const UserValidations = {
  createUserValidationsSchema,
};
