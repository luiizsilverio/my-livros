import mongoose from "mongoose";

// Faz com que todos os campos String sejam obrigatórios

mongoose.Schema.Types.String.set("validate", {
  validator: (value) => !!value,
  message: ({ path }) => `O campo ${path} precisa estar preenchido`
})
