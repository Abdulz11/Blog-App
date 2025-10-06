
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'
import { useRouter } from 'next/router'
 

// const changeRoute = ()=>{
//   const router = useRouter();
//   console.log(router)
// }
// changeRoute()

describe('Home page', () => {
  it('renders hero text and a button link to write page', () => {
    render(<Home />)
    const heading = screen.getByTestId('hero-text')
    const writePagebuttonLink = screen.getByRole("button",{name:/write/i})
    const heroImage = screen.getByTestId('hero-image')

    expect(heading).toBeInTheDocument();
    expect(writePagebuttonLink).toBeInTheDocument();
    expect(heroImage).toBeInTheDocument()

  })

})