
export default {
  async fetch(request) {
    return Response.json({
      success: true,
      message: "Vercel backend is working!",
      method: request.method
    });
  }
};
