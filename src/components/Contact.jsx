import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  
  const {name,message,email} = form

  const handleChange = (e) => {
    const {name,value} = e.target;
   setForm({...form, [name]:value})
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
  if(name === ''){
   toast('please fill in your name'),setLoading(false)
   return
  } else if(message=== ''){
    toast('please fill in th message box'),
    setLoading(false)
    return
  } else if(email === ''){
    toast('please fill in your email'),
     setLoading(false)
     return
  }
  
   else{
    emailjs.send(
      'service_gw6jt3d',
      'template_ryd4stt',
      {
      from_name: form.name,
      to_name: 'Ismail',
      from_email: form.email,
      to_email: 'yi016679@gmail.com',
      message:form.message
      },
       'hRucGz3gmMNcl46Wk'
    )
    .then(()=>{
      setLoading(false)
      toast('Thank you, I will get back to you as soon as possible. ')

    setForm({
      name: '',
      email: '', 
      message: '',
    })
    }, (error)=>{
      setLoading(false)
      console.log(error)
      toast('something went wrong.')
    })
  }
    
  };
  return (
    <div
      className="xl:mt-12 xl:flex-row 
    flex-col-reverse flex gap-10 overflow-hidden"
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl "
      >
        <p>Get in touch </p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span
              className="text-white 
            font-medium mb-4"
            >
              {" "}
              Your Name
            </span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="what's your name ?"
              className="bg-tertiary py-4
             px-6 placeholder:text-secondary
             text-white rounded-lg outline-none
              border-none font-medium"
            ></input>
          </label>
          <label className="flex flex-col">
            <span
              className="text-white 
            font-medium mb-4"
            >
              
              Your Email
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="what's your email ?"
              className="bg-tertiary py-4
             px-6 placeholder:text-secondary
             text-white rounded-lg outline-none
              border-none font-medium"
            ></input>
          </label>
          <label className="flex flex-col">
            <span
              className="text-white 
            font-medium mb-4"
            >
              Your Message
            </span>
            <textarea
              row="7"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="what do you want to say?"
              className="bg-tertiary py-4
             px-6 placeholder:text-secondary
             text-white rounded-lg outline-none
              border-none font-medium"
            ></textarea>
          </label>
          <button
            className="bg-tetiary py-3 px-8
          outline-none w-fit text-white
          font-bold shadow-md shadow-primary
          rounded-xl"
          >
            {loading ? "sending..." : "send"}
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px]
       h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
