import { Suspense, useRef, useState } from 'react'
import { Canvas } from "@react-three/fiber";
import emailjs from '@emailjs/browser'
import Loader from '../components/Loader';
import Fox from '../models/Fox';
import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";



const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({name: '', email: '', message: ''})
  const { alert, showAlert, hideAlert } = useAlert();
  
  const [isLoading, setIsLoading] = useState(false)
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation('hit')
  
    emailjs.send(
      // import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      'service_mpbq65c',
      // import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      'template_yqkso8r',
      {
        from_name: form.name,
        to_name: "Rachana",
        from_email: form.email,
        to_email: 'rachanasen1999@gmail.com',
        message: form.message
      },
      // import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      'j62ZLmLAUTfVfyzZ5'
    ).then(() => {
      setIsLoading(false);
      
      showAlert({ show: true, text: 'Message sent successfully!',
        type: 'success'
      })
      setTimeout(() => {
        hideAlert()
        setCurrentAnimation('idle')
        
        setForm({ name: '', email: '', message: '' })
        
      }, [3000])
      

      // TODO: Hide an alert
    }).catch((error) => { // Add error parameter here
      setIsLoading(false);
      setCurrentAnimation('idle')
      showAlert({ show: true, text: 'I did not recieve your message ',
      type: 'danger'
    })
    });
  };
  
  const handleFocus = () => setCurrentAnimation('walk');
  const handleBlur = () => setCurrentAnimation('idle');
 
  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {alert.show && <Alert {...alert} />}
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in Touch</h1>
        <form 
        className="w-full flex flex-col gap-7 mt-14"
        onSubmit={handleSubmit}>
          <label className="text-black-500 font-semibold">
            Name
            <input type="text"
            name="name"
            className="input"
            placeholder="Enter your name"
            required
            value={form.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}

            />
          </label>

          <label className="text-black-500 font-semibold">
            Email
            <input type="email"
            name="email"
            className="input"
            placeholder="Enter your Email"
            required
            value={form.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}

            />
          </label>

          <label className="text-black-500 font-semibold">
            message
            <textarea
            name="message"
            rows={4}
            className="textarea"
            placeholder="Let me know how can i help you!"
            required
            value={form.change}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}

            />
          </label>
          <button
          type="submit"
          className='btn'
          disabled={isLoading}
          onFocus={handleFocus}
          onBlur={handleBlur}
          >
            {isLoading ? 'Sending...' : 'Send message'}

          </button>

        </form>
      </div>

      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550]'>
      <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight position={[0, 0, 1]} intensity={2.5} />
          <ambientLight intensity={1} />
          <pointLight position={[5, 10, 0]} intensity={2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />

          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.629, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Contact