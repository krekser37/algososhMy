import  renderer  from "react-test-renderer";
import { Button } from "../button";

const buttonText = 'Click me!'

describe('test Button component', ()=>{
    it('render button with text', ()=>{
        const tree = renderer.create(<Button text={buttonText}/>).toJSON()

        expect(tree).toMatchSnapshot()
    })

    it('render disabled with', ()=>{
        const tree = renderer.create(<Button text={buttonText} disabled/>).toJSON()

        expect(tree).toMatchSnapshot()
    })

    
})