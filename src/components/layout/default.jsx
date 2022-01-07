import styled from 'styled-components'
import Footer from '../footer'
import Navbar from '../navbar'

const LayoutContainer = styled.div`
`
const HeaderBodyWrapper = styled.div`
min-height: calc(100vh - 64px);
`
const HeaderSection = styled.div`
position: sticky;
top: 0;
height: 64px;
`
const BodySection = styled.div`
min-height: inherit;
`
const FooterSection = styled.div`
`

export default function DefaultLayout({ children }){
  return (
    <LayoutContainer>
      <HeaderBodyWrapper>
        <HeaderSection className="p-3 z-10 w-auto flex flex-wrap place-items-center sticky top-0 backdrop-filter backdrop-blur-sm bg-gray-900 bg-opacity-80 text-white">
          <Navbar />
        </HeaderSection>
        <BodySection>
          {children}
        </BodySection>
      </HeaderBodyWrapper>
      <FooterSection>
        <Footer />
      </FooterSection>
    </LayoutContainer>
  )
}