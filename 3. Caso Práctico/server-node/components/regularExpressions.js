const validateEmail=(value)=>{ var re = /\S+@\S+\.\S+/; return re.test(value); }

module.exports={
    validateEmail
}