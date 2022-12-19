import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const Form = () => {
  const schema = yup.object().shape({
    fullName: yup.string().required("cannot not be empty"),
    age: yup
      .number()
      .positive()
      .integer()
      .min(18)
      .required("must be greater than 18"),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(15).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords don't match")
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Enter Name" {...register("fullName")} />
      <p>{errors.fullName?.message}</p>

      <input type="number" placeholder="Enter Age" {...register("age")} />
      <p>{errors.age?.message}</p>

      <input type="text" placeholder="Enter Email" {...register("email")} />
      <p>{errors.email?.message}</p>

      <input
        type="password"
        placeholder="Enter password"
        {...register("password")}
      />
      <p>{errors.password?.message}</p>

      <input
        type="password"
        placeholder="re-enter password"
        {...register("confirmPassword")}
      />
      <p>{errors.confirmPassword?.message}</p>

      <input type="submit" />
    </form>
  );
};
