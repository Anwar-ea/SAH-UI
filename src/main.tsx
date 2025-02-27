import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { RouterProvider } from 'react-router-dom'
import { routes } from './pages/page.routes.tsx'
import { loadConfig } from './utility/config.ts'
import { UserProvider } from './stateContext/root-state-context.tsx'
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

loadConfig().then(x => {

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <RouterProvider router={routes} /> 
          </UserProvider>
        </QueryClientProvider>
    </StrictMode>
  )
});
