exports.errHandler = (err, req, res, next) => {
  const status = err.status || 500;

  if (
    err.message === "incorrect email" ||
    err.message === "incorrect password"
  ) {
    return res.status(401).json({
      errors: {
        [err.field]: err.message,
      },
    });
  }

  if (err.name === "ValidationError") {
    const errors = {};
    for (let field in err.errors) {
      errors[field] = err.errors[field].message;
    }
    return res.status(400).json({ errors });
  }

  // Handle duplicate email error
  if (err.code === 11000) {
    return res
      .status(400)
      .json({ error: "Email already exists. Please use another email." });
  }

  return res
    .status(status)
    .json({ error: err.message || "Something went wrong" });
};
