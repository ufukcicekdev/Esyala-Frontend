


import React from 'react'

function Subscribe() {
  return (
    <>
        <div className="holder">
            <form className="newsletter-form form2" method="POST" action="">
                
                <fieldset>
                    <input 
                        type="email" 
                        className="form-control" 
                        name="email" 
                        placeholder="E-posta Adresinizi Girin" 
                        required 
                    />
                    <button type="submit">Abone Ol</button>
                </fieldset>
            </form>
        </div>
    </>
  )
}

export default Subscribe