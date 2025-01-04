import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
    matcher: [
        // Ignora arquivos estáticos e rotas internas do Next.js
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Aplica sempre para rotas da API
        '/(api|trpc)(.*)',
    ],
};
