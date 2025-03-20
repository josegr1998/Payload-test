export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url)
    const path = searchParams.get('path')
    const draftModeToken = searchParams.get('draftModeToken')

    if (!draftModeToken) {
      return new Response('Draft Mode Token is required', { status: 400 })
    }

    if (!path) {
      return new Response('Path is required', { status: 400 })
    }

    if (!path.startsWith('/')) {
      return new Response('Invalid path', { status: 400 })
    }

    return Response.redirect(
      `${process.env.BASE_URL}${path}?isDraftMode=true&draftModeToken=${draftModeToken}`,
      307,
    )
  } catch (error) {
    console.error('error --->', error)
    return new Response('Invalid token', { status: 401 })
  }
}
