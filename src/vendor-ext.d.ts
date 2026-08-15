declare namespace VendorSDK {
  interface Context {
    user?: User
  }
}

function processContext(ctx: VendorSDK.Context) {
  console.log(ctx.requestId, ctx.user)
}