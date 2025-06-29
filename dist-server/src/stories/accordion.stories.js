// [build] library: 'shadcn'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "../components/ui/accordion";
const meta = {
    title: "ui/Accordion",
    component: Accordion,
    tags: ["autodocs"],
    argTypes: {},
};
export default meta;
export const Base = {
    render: (args) => (<Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components'
          aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>),
    args: {
        type: "single",
        collapsible: true,
    },
};
