import { Form } from "react-bootstrap";
import payment from "@assets/payment.png";
import { useForm } from "@hooks/useForm";
import { useProfile } from "@f/profile/contexts/ProfileContext";

function PaymentForm(){

    const {profile} = useProfile()
    const {onChange, formData} = useForm(profile)

    return (
    <div
       className="d-flex justify-content-center align-items-center mt-2"
       //style={{ minHeight: "100vh" }} 
       >
        <Form 
             className="island border"
             style={{ width: "700px", padding:"40px", background: "#fff", borderRadius: "10px"}}
             action="">
            <div className="d-flex flex-wrap gap-3">
                <div style={{flex: "1 1 250px"}} className="">
                    <h4 className="mb-4 text-uppercase fw-semibold">Billing Address</h4>
                    <div className="my-3">
                        <span className="d-block mb-2">Full Name :</span>
                        <input 
                            type="text" 
                            placeholder="Jacob Aiden" 
                            className="w-100 px-2 py-2 border rounded" 
                            nombre="fullname"
                            value={formData?.firstName + " " + formData?.lastName}
                            onChange={onChange}
                        />
                    </div>
                    <div className="my-3">
                        <span className="d-block mb-2">Email :</span>
                        <input 
                            type="email" 
                            placeholder="example@example.com" 
                            className="w-100  px-2 py-2 border rounded" 
                            nombre="email"
                            value={formData?.email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="my-3">
                        <span className="d-block mb-2">Address :</span>
                        <input 
                            name = "address"
                            type="text" 
                            placeholder="Room - Street - Locality" 
                            className="w-100 px-2 py-2 border rounded" 
                            value={formData?.address}
                            onChange={onChange}
                        />
                    </div>
                    <div className="my-3">
                        <span className="d-block mb-2">City :</span>
                        <input 
                           type="text" 
                           placeholder="Berlin" 
                           className="w-100 px-2 py-2 border rounded" 
                           nombre="city"
                           value={formData.city}
                           onChange={onChange}
                        />
                    </div>

                    <div className="d-flex gap-3 mb-3">
                        <div >
                            <span className="d-block mb-2">State :</span>
                            <input 
                                type="text" 
                                placeholder="Germany"
                                className="w-100 px-2 py-2 border rounded"
                                nombre="state"
                                value={formData.state}
                                onChange={onChange} 
                            />
                        </div>
                        <div>
                            <span className="d-block mb-2">Zip Code :</span>
                            <input 
                               type="number" 
                               placeholder="123 456" 
                               className="w-100 px-2 py-2 border rounded" 
                               nombre="state"
                               value={formData.state}
                               onChange={onChange} 
                            />
                        </div>
                    </div>
                </div>

                <div  style={{flex: "1 1 250px"}} className="">
                    <h4 className="mb-4 text-uppercase fw-semibold">Payment</h4>
                    <div className="my-3">
                        <span className="d-block mb-2">Cards Accepted :</span>
                        <img 
                            className="mb-1" 
                            src={payment}  
                            height={38} 
                            alt="" />
                    </div>
                    <div className="my-3">
                        <span className="d-block mb-2">Name On Card :</span>
                        <input 
                            type="text" 
                            className="w-100 px-2 py-2 border rounded" 
                            placeholder="Mr. Jacob Aiden" 
                            nombre="cardName"
                            value={formData.cardName}
                            onChange={onChange} 
                        />
                    </div>
                    <div className="my-3">
                        <span className="d-block mb-2">Credit Card Number :</span>
                        <input 
                            type="number" 
                            placeholder="1111 2222 3333 4444" 
                            className="w-100 px-2 py-2 border rounded" 
                            nombre="cardNumber"
                            value={formData.cardNumber}
                            onChange={onChange} 
                        />
                    </div>
                    <div className="my-3">
                        <span className="d-block mb-2">Exp. Month :</span>
                        <input 
                            type="text" 
                            placeholder="August" 
                            className="w-100 px-2 py-2 border rounded" 
                            nombre="cardExpMonth"
                            value={formData.cardExpMonth}
                            onChange={onChange} 
                        />
                    </div>
                
                    <div className="d-flex gap-3 mb-3">
                        <div className="">
                            <span className="d-block mb-2" >Exp. Year :</span>
                            <input 
                                type="number" 
                                placeholder="2025" 
                                className="w-100 px-2 py-2 border rounded" 
                                nombre="cardExpYear"
                                value={formData.cardExpYear}
                                onChange={onChange} 
                            />
                        </div>
                        <div className="">
                            <span className="d-block mb-2">CVV :</span>
                            <input 
                                type="number" 
                                placeholder="123" 
                                className="w-100 px-2 py-2 border rounded" 
                                nombre="cardCVV"
                                value={formData.cardCVV}
                                onChange={onChange} 
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* <Button type="submit" className="btn w-100 small border-0">
               Confirmar Compra
            </Button> */}
        </Form>
    </div>
    )
}

export default PaymentForm;
