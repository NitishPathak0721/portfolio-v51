import React, { useState, useEffect } from "react";
import {
  Share2,
  User,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";

import SocialLinks from "../components/SocialLinks";

import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";


const ContactPage = () => {

  // ==========================================
  // Form State
  // ==========================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] =
    useState(false);


  // ==========================================
  // AOS
  // ==========================================

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);


  // ==========================================
  // Handle Input Changes
  // ==========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // ==========================================
  // Handle Submit
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setIsSubmitting(true);


    Swal.fire({
      title: "Sending Message...",
      html: "Please wait while your message is being sent.",
      allowOutsideClick: false,

      didOpen: () => {
        Swal.showLoading();
      },
    });


    try {

      // ======================================
      // FormSubmit Email
      // ======================================

      const formSubmitUrl =
        "https://formsubmit.co/nitishpathak2500@gmail.com";


      const submitData = new FormData();


      submitData.append(
        "name",
        formData.name
      );

      submitData.append(
        "email",
        formData.email
      );

      submitData.append(
        "message",
        formData.message
      );


      submitData.append(
        "_subject",
        "New Message from Nitish Pathak's Portfolio"
      );


      submitData.append(
        "_captcha",
        "false"
      );


      submitData.append(
        "_template",
        "table"
      );


      // ======================================
      // Send Request
      // ======================================

      await axios.post(
        formSubmitUrl,
        submitData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );


      // ======================================
      // Success
      // ======================================

      Swal.fire({
        title: "Success!",
        text: "Your message has been sent successfully!",
        icon: "success",
        confirmButtonColor: "#6366f1",
        timer: 2000,
        timerProgressBar: true,
      });


      // Reset form

      setFormData({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {

      // ======================================
      // FormSubmit sometimes returns
      // status 0 because of browser behaviour.
      // ======================================

      if (
        error.request &&
        error.request.status === 0
      ) {

        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully!",
          icon: "success",
          confirmButtonColor: "#6366f1",
          timer: 2000,
          timerProgressBar: true,
        });


        setFormData({
          name: "",
          email: "",
          message: "",
        });

      } else {

        Swal.fire({
          title: "Failed!",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          confirmButtonColor: "#6366f1",
        });

      }

    } finally {

      setIsSubmitting(false);

    }
  };


  // ==========================================
  // UI
  // ==========================================

  return (

    <div
      className="
        px-[5%]
        sm:px-[5%]
        lg:px-[10%]
      "
    >

      {/* =====================================
          Section Heading
      ===================================== */}

      <div
        className="
          text-center
          lg:mt-[5%]
          mt-10
          mb-2
          sm:px-0
          px-[5%]
        "
      >

        <h2
          data-aos="fade-down"
          data-aos-duration="1000"

          className="
            inline-block
            text-3xl
            md:text-5xl
            font-bold
            text-center
            mx-auto
            text-transparent
            bg-clip-text
            bg-gradient-to-r
            from-[#6366f1]
            to-[#a855f7]
          "
        >

          <span
            style={{
              color: "#6366f1",
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip:
                "text",
              backgroundClip: "text",
              WebkitTextFillColor:
                "transparent",
            }}
          >
            Contact Me
          </span>

        </h2>


        <p
          data-aos="fade-up"
          data-aos-duration="1100"

          className="
            text-slate-400
            max-w-2xl
            mx-auto
            text-sm
            md:text-base
            mt-2
          "
        >
          Have a question or want to work
          together? Send me a message and
          I&apos;ll get back to you soon.
        </p>

      </div>


      {/* =====================================
          Contact Section
      ===================================== */}

      <div
        className="
          h-auto
          py-10
          flex
          items-center
          justify-center
          2xl:pr-[3.1%]
          lg:pr-[3.8%]
          md:px-0
        "

        id="Contact"
      >

        <div
          className="
            container
            px-[1%]
            grid
            grid-cols-1
            sm:grid-cols-1
            md:grid-cols-1
            lg:grid-cols-[45%_55%]
            2xl:grid-cols-[35%_65%]
            gap-12
          "
        >


          {/* =================================
              CONTACT FORM
          ================================= */}

          <div
            className="
              bg-white/5
              backdrop-blur-xl
              rounded-3xl
              shadow-2xl
              p-5
              py-10
              sm:p-10
              transform
              transition-all
              duration-500
              hover:shadow-[#6366f1]/10
            "
          >

            {/* Header */}

            <div
              className="
                flex
                justify-between
                items-start
                mb-8
              "
            >

              <div>

                <h2
                  className="
                    text-4xl
                    font-bold
                    mb-3
                    text-transparent
                    bg-clip-text
                    bg-gradient-to-r
                    from-[#6366f1]
                    to-[#a855f7]
                  "
                >
                  Get In Touch
                </h2>


                <p className="text-gray-400">
                  Have something to discuss?
                  Send me a message and let&apos;s
                  talk.
                </p>

              </div>


              <Share2
                className="
                  w-10
                  h-10
                  text-[#6366f1]
                  opacity-50
                "
              />

            </div>


            {/* =================================
                FORM
            ================================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >


              {/* ===============================
                  NAME
              =============================== */}

              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="relative group"
              >

                <User
                  className="
                    absolute
                    left-4
                    top-4
                    w-5
                    h-5
                    text-gray-400
                    group-focus-within:text-[#6366f1]
                    transition-colors
                  "
                />


                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"

                  value={formData.name}

                  onChange={handleChange}

                  disabled={isSubmitting}

                  className="
                    w-full
                    p-4
                    pl-12
                    bg-white/10
                    rounded-xl
                    border
                    border-white/20
                    placeholder-gray-500
                    text-white
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#6366f1]/30
                    transition-all
                    duration-300
                    hover:border-[#6366f1]/30
                    disabled:opacity-50
                  "

                  required
                />

              </div>


              {/* ===============================
                  EMAIL
              =============================== */}

              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative group"
              >

                <Mail
                  className="
                    absolute
                    left-4
                    top-4
                    w-5
                    h-5
                    text-gray-400
                    group-focus-within:text-[#6366f1]
                    transition-colors
                  "
                />


                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"

                  value={formData.email}

                  onChange={handleChange}

                  disabled={isSubmitting}

                  className="
                    w-full
                    p-4
                    pl-12
                    bg-white/10
                    rounded-xl
                    border
                    border-white/20
                    placeholder-gray-500
                    text-white
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#6366f1]/30
                    transition-all
                    duration-300
                    hover:border-[#6366f1]/30
                    disabled:opacity-50
                  "

                  required
                />

              </div>


              {/* ===============================
                  MESSAGE
              =============================== */}

              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="relative group"
              >

                <MessageSquare
                  className="
                    absolute
                    left-4
                    top-4
                    w-5
                    h-5
                    text-gray-400
                    group-focus-within:text-[#6366f1]
                    transition-colors
                  "
                />


                <textarea
                  name="message"
                  placeholder="Your Message"

                  value={formData.message}

                  onChange={handleChange}

                  disabled={isSubmitting}

                  className="
                    w-full
                    resize-none
                    p-4
                    pl-12
                    bg-white/10
                    rounded-xl
                    border
                    border-white/20
                    placeholder-gray-500
                    text-white
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#6366f1]/30
                    transition-all
                    duration-300
                    hover:border-[#6366f1]/30
                    h-[9.9rem]
                    disabled:opacity-50
                  "

                  required
                />

              </div>


              {/* ===============================
                  SUBMIT BUTTON
              =============================== */}

              <button
                data-aos="fade-up"
                data-aos-delay="400"

                type="submit"

                disabled={isSubmitting}

                className="
                  w-full
                  bg-gradient-to-r
                  from-[#6366f1]
                  to-[#a855f7]
                  text-white
                  py-4
                  rounded-xl
                  font-semibold
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:shadow-lg
                  hover:shadow-[#6366f1]/20
                  active:scale-[0.98]
                  flex
                  items-center
                  justify-center
                  gap-2
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  disabled:hover:scale-100
                "
              >

                <Send className="w-5 h-5" />

                {isSubmitting
                  ? "Sending..."
                  : "Send Message"}

              </button>

            </form>


            {/* =================================
                SOCIAL LINKS
            ================================= */}

            <div
              className="
                mt-10
                pt-6
                border-t
                border-white/10
                flex
                justify-center
                space-x-6
              "
            >

              <SocialLinks />

            </div>

          </div>


          {/* =================================
              RIGHT SIDE CONTACT CARD
          ================================= */}

          <div
            className="
              bg-white/5
              backdrop-blur-xl
              rounded-3xl
              p-8
              md:p-10
              shadow-2xl
              transform
              transition-all
              duration-500
              hover:shadow-[#6366f1]/10
              flex
              flex-col
              justify-center
            "
            data-aos="fade-left"
            data-aos-duration="1000"
          >

            {/* Icon */}

            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-gradient-to-br
                from-[#6366f1]/20
                to-[#a855f7]/20
                border
                border-white/10
                flex
                items-center
                justify-center
                mb-7
              "
            >

              <Sparkles
                className="
                  w-8
                  h-8
                  text-[#a78bfa]
                "
              />

            </div>


            {/* Heading */}

            <h3
              className="
                text-3xl
                md:text-4xl
                font-bold
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-[#6366f1]
                to-[#a855f7]
                mb-5
              "
            >
              Let&apos;s Build
              Something Together
            </h3>


            {/* Description */}

            <p
              className="
                text-gray-400
                text-base
                md:text-lg
                leading-relaxed
                mb-8
              "
            >
              I&apos;m always open to discussing
              new ideas, interesting projects,
              collaborations, and opportunities
              to learn and grow together.
            </p>


            {/* Contact Information */}

            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                p-5
                mb-8
              "
            >

              <p
                className="
                  text-sm
                  text-gray-500
                  mb-2
                "
              >
                Email
              </p>

              <a
                href="mailto:nitishpathak2500@gmail.com"

                className="
                  text-sm
                  md:text-base
                  text-slate-200
                  hover:text-[#a78bfa]
                  transition-colors
                  break-all
                "
              >
                nitishpathak2500@gmail.com
              </a>

            </div>


            {/* Availability */}

            <div
              className="
                flex
                items-center
                gap-3
                text-sm
                text-slate-400
              "
            >

              <span
                className="
                  w-2.5
                  h-2.5
                  rounded-full
                  bg-green-400
                  shadow-[0_0_12px_rgba(74,222,128,0.7)]
                "
              />

              Open to opportunities
              and collaborations

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};


export default ContactPage;