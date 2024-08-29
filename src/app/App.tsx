import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import { RouterProvider } from 'atomic-router-react'
import { Suspense } from 'react'

import { Pages } from '@/pages'
import { router } from '@/shared/routing'
import { LoadingScreen } from '@/shared/ui/LoadingScreen'

export const App = () => {
  return (
    <MantineProvider defaultColorScheme="auto">
      <Suspense fallback={<LoadingScreen />}>
        <RouterProvider router={router}>
          <Pages />
        </RouterProvider>
      </Suspense>
    </MantineProvider>
  )
}
