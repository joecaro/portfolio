import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProjectCard from '../ProjectCard'

describe("Project Card",() => {
    let expectedProps;

    beforeEach(() => {
        expectedProps = {
          project: {
            title: "CMDI Website",
            demo: "https://cmdi.netlify.app",
            description: "Website for SAAS CRM Platform with blog and hubspot integration.",
            github: "not available",
            image: "https://res.cloudinary.com/joecarothers/image/upload/v1636851615/misc/Screenshot_2021-11-13_195808_qutq8c.png",
            position: 1,
            slug: "cmdi-website",
            stack: [
                "Next.js",
                "Contentful"
            ],
            tags: [
                "project",
                "featured"
            ],
            tech: [
                "react",
                "next"
            ]
          }
        };
      });
    
      test('renders correctly with all props', () => {
    const { container, getByText, getByTestId } = render(<ProjectCard project={expectedProps.project}></ProjectCard>);
            expect(getByText("CMDI Website")).toBeInTheDocument();
      })
})