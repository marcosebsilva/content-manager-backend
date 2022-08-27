import { Error } from "mongoose";

/**Represents simple way to read a error derivated from {@link Error.ValidatorError}
* @param key is the key property that threw the {@link Error.ValidatorError}
* @param message is the error message explaining the error {@link Error.ValidatorError.properties["message"]}
*/

type CleanValidatorError = {
  key: string,
  message: string
}

/**
 * Convert the errors from a {@link Error.ValidationError}
 * to a format easier to handle.
 *
 * @param error a instance of {@link Error.ValidationError}
 * @returns an array of {@link CleanValidatorError}
 */

export default function(error: Error.ValidationError) {
  const errorMessages: CleanValidatorError[] = [];
  Object.entries(error.errors).forEach(([key, properties]) => {
    errorMessages.push({key, message: properties.message});
  });
  return errorMessages;
}