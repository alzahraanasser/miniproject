import * as yup from "yup";

export const carSchemaValidation = yup.object().shape({
  startDate: yup
    .date()
    .required("Start date is required")
    .typeError("Start date must be a valid date"),
  endDate: yup
    .date()
    .required("End date is required")
    .typeError("End date must be a valid date")
    .min(yup.ref("startDate"), "End date cannot be before start date"),
  startTime: yup
    .string()
    .required("Start time is required")
    .matches(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Start time must be in HH:MM (24-hour) format"
    ),
  endTime: yup
    .string()
    .required("End time is required")
    .matches(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "End time must be in HH:MM (24-hour) format"
    )
    .test(
      "is-after-start",
      "End time must be after start time",
      function (value) {
        const { startTime } = this.parent;
        if (!startTime || !value) return true; // Skip validation if either field is missing
        const [startHour, startMinute] = startTime.split(":").map(Number);
        const [endHour, endMinute] = value.split(":").map(Number);
        return (
          endHour > startHour || (endHour === startHour && endMinute > startMinute)
        );
      }
    ),
});
