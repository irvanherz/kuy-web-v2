import styled from 'styled-components'

const LayoutContainer = styled.div`
min-height: 100vh;
`

export default function EmptyLayout({ children }) {
  return (
    <LayoutContainer>
      {children}
    </LayoutContainer>
  )
}