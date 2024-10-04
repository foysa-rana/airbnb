const notFoundMiddleware = (req: any, res: any) => {
  res.status(404).json({ message: "This page does not exist..." });
};

export default notFoundMiddleware;
