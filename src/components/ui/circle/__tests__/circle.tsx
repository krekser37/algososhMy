import renderer from "react-test-renderer";
import { ElementStates } from "../../../../types/element-states";
import { Circle } from "../circle";
const letterText='1';
const headText= 'head';
const tailText= 'tail';
const indexText = 0;

describe("test circle component", ()=>{
it("render circle without letter",()=>{
    const circle = renderer.create(<Circle/>).toJSON();
    expect(circle).toMatchSnapshot();
})

it("render circle with letter",()=>{
    const circle = renderer.create(<Circle letter={letterText}/>).toJSON();
    expect(circle).toMatchSnapshot();
})

it("render circle with head",()=>{
    const circle=renderer.create(<Circle head={headText}/>).toJSON();
    expect(circle).toMatchSnapshot();
})

it("render circle with react-component в head",()=>{
    const circle=renderer.create(<Circle head={<Circle/>}/>).toJSON();
    expect(circle).toMatchSnapshot();
})

it("render circle with tail",()=>{
    const circle=renderer.create(<Circle tail={tailText}/>).toJSON();
    expect(circle).toMatchSnapshot();
})

it("render circle with react-component в tail",()=>{
    const circle=renderer.create(<Circle tail={<Circle/>}/>).toJSON();
    expect(circle).toMatchSnapshot();
})

it("render circle with index",()=>{
    const circle=renderer.create(<Circle index={indexText}/>).toJSON();
    expect(circle).toMatchSnapshot();
})

it("render circle with props 'isSmall ===  true'",()=>{
    const circle=renderer.create(<Circle isSmall={true}/>).toJSON();
    expect(circle).toMatchSnapshot();
})

it("render circle with state = default",()=>{
    const circle=renderer.create(<Circle state={ElementStates.Default}/>).toJSON();
    expect(circle).toMatchSnapshot();
})

it("render circle with state = changing",()=>{
    const circle=renderer.create(<Circle state={ElementStates.Changing}/>).toJSON();
    expect(circle).toMatchSnapshot();
})

it("render circle with state = modified",()=>{
    const circle=renderer.create(<Circle state={ElementStates.Modified}/>).toJSON();
    expect(circle).toMatchSnapshot();
})

})