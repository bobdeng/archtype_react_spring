// import {setupServer} from "msw/node";
// import {rest} from "msw";
//
// const commodity = {
//   idOfPlatform: "123456",
//   shopName: "张三的小店"
// }
// const restHandlers = [
//   rest.get('/api/1.0/commodities', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json([commodity]))
//   })
// ]
// const server = setupServer(...restHandlers)
//
// server.listen({onUnhandledRequest: 'error'})

import { initialize, mswDecorator } from 'msw-storybook-addon';
initialize();
export const decorators = [mswDecorator];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}