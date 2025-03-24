import { Accordion, AccordionDetails, AccordionSummary,Button,Checkbox,FormControlLabel,FormGroup,Typography } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const demo=[
  {
    category:"Nuts & Seeds",
    ingredients:["Cashews"]
  },
  {
    category:"Protein",
    ingredients:["Ground Beef","Bacon Strips"]
  },

]


const MenuCard = () => {

  const handleCheckBoxChange=(value)=>{
    console.log(value)
  }

  return (
    <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1-content"
      id="panel1-header"
    >
      
      <div className='lg:flex items-center justify-between'>
        <div className='lg:flex items-center lg:gap-5'>
          <img 
          className='w-[7rem] h-[7rem] object-cover'
          src="https://lh3.googleusercontent.com/p/AF1QipMZ8YdOZ04caY1pigSnjjLmOHfyPbtmfsvyXMIS=s680-w680-h510"
           alt="" />


        <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
          <p className='font-semibold text-xl'>Burger</p>
          <p>Rs 550</p>
          <p className='text-gray-400'>nice - food</p>

        </div>

        </div>

      </div>


    </AccordionSummary>
    <AccordionDetails>
     
     <form>
      <div className='flex gap-5 flex-wrap'>
        {
          demo.map((item)=>
            <div>
              <p>
                {
                  item.category
                }
              </p>
                    <FormGroup>
        {item.ingredients.map((item)=> <FormControlLabel 
        control={<Checkbox onChange={()=>handleCheckBoxChange(item)}/>} label={item} />) }

        </FormGroup>
            </div>
      
          )
        }
      </div>
        
        <div className='pt-5'>
          <Button variant='contained' type='submit' disabled={false}>
          {true?"Add to Cart":"Out Of Stock"}
          </Button>
        </div>

     </form>


    </AccordionDetails>
  </Accordion>
  )
}

export default MenuCard