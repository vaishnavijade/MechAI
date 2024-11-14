import React from 'react'
import './Contact.css';

const Contact = () => {
  return (
    <>
    <div className="contact_info">
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-10 offset-lg-1 d-flex justify-content between' >
            {/* phonenumber */}
            
          </div>
          </div></div></div>
          {/* contact us from */}
          <div className='contact-form'>
            <div className='container'>
              <div className='row'>
                <div className='col-lg-10 offset-lg-1'>
                  <div className='contact-form-container py-5'>
                    <div className='contact_form_title'>Get in touch</div>
                    <form id="contact_form">
                      <div className='contact_form_name d-flex justify-content-between align-items-between'>
                        <input type="text" id="contact_form_name" 
                              className='contact_form_name input_field'
                              placeholder='your name' required="true"/>
                        <input type="Email" id="contact_form_email" 
                              className='contact_form_name input_field'
                              placeholder='your Email' required="true"/>
                        <input type="tel" id="contact_form_phone" 
                              className='contact_form_name input_field'
                              placeholder='phone number' required="true"/>
                      </div>
                      <div className='contact_form_text mt-5'>
                        <textarea id="text_field contact_form_message" placeholder="Message" cols="30" rows="10"></textarea>
                      </div>
                      <div className='contact_form_button'>
                        <button type="submit" className='button contact_submit_button'>Send Message</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
  )
}

export default Contact