import React, { useRef, useCallback, useState, useEffect } from 'react';
import * as Yup from 'yup';
import Cards, { Focused } from 'react-credit-cards';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useNavigate } from 'react-router';
import valid from 'card-validator';

import getValidationError from '../../helper/Validations';
import { setToLocalStorage } from '../../helper/local-storage';
import { VASCO_NA_WEB_CREDIT_CARD } from '../../constants/local-storage';
import { creditCardMask, titularNameMask, dateMask, cvvMask } from '../../helper/masks';

import {
    CARD_NUMBER_PLACEHOLDER,
    CVV_PLACEHOLDER,
    DATE_PLACEHOLDER,
    TITULAR_NAME_PLACEHOLDER
  } from '../../constants/placeholder';
  import Button from '../../components/Button';
import Input from '../../components/Input';
import SumInfo from '../../components/SumInfo';
import { useCart } from '../../hooks/useCart';

import { Container, FormContent, FormGroup, Content, InputsContent, CartContent } from './styles';

export default function CartPayment(){
   const { creditCardInfo, setCreditCardInfo, cartItems } = useCart();
    const [ isProgressive, setIsProgressive ] = useState(false);

    const navigate = useNavigate();
    const formRef = useRef<FormHandles>(null);

    useEffect(() => {
        if(cartItems?.length === 0) navigate('/', { replace: true})
    },[]);
    
    const validForm = async () => {
        try {
            const data = formRef?.current?.getData();

            formRef.current?.setErrors({});
            
            const schema = Yup.object().shape({
                number: Yup.string()
                .min(17, 'Card number must be at least 14 digits')
                .test(
                    'test-number',
                    'Enter a valid credit card number',
                    (value) => valid.number(value).isValid
                )
                .required('Enter the card number'),
                    name: Yup.string()
                .required('Enter the name of the holder')
                .min(3, 'Name must have at least 3 letters'),
                    expiry: Yup.string()
                .required(' ')
                .min(5, 'Date must be at least 4 digits'),
                    cvc: Yup.string()
                .required('Enter card code')
                .min(3, 'CVC must have at least 3 digits')
            });
            await schema.validate(data, { abortEarly: false });
            return true;

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationError(error);
                formRef.current?.setErrors(errors);
                return;
              }
        
              return false;
            
        }
    };
    const handleChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
          switch (e.currentTarget.id) {
            case 'number':
              creditCardMask(e);
              break;
            case 'name':
              titularNameMask(e);
              break;
            case 'expiry':
              dateMask(e);
              break;
            case 'cvc':
              cvvMask(e);
              break;
            default:
          }
          setCreditCardInfo({
            ...creditCardInfo,
            [e.currentTarget.id]: e.currentTarget.value
          });
        },
        [creditCardInfo]
      );

      const handleFocus = useCallback(
        (value) => {
          const f: Focused = value;
    
          setCreditCardInfo({
            ...creditCardInfo,
            focused: f
          });
        },
        [creditCardInfo]
      );
      const handleSubmit = useCallback(async (data: any) => {
        const formIsValid = await validForm();
    
        if (formIsValid) {
          setCreditCardInfo(data);
    
          const maskData = {
            ...data,
            cvc: '###'
          };
    
          setToLocalStorage(VASCO_NA_WEB_CREDIT_CARD, maskData);
    
          setIsProgressive(true);
          setTimeout(() => navigate('/cart/confirmation', { replace: true }), 5000);
        }
      }, []);

      return (
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Content>
              <div>
                <h2>CREDIT CARD</h2>
                <FormContent>
                  <InputsContent>
                    <fieldset>
                      <label htmlFor="number">Card number:</label>
                      <Input
                        id="number"
                        name="number"
                        type="text"
                        placeholder={CARD_NUMBER_PLACEHOLDER}
                        defaultValue={creditCardInfo?.number || ''}
                        onChange={handleChange}
                        onFocus={(e) => handleFocus(e.target.name)}
                        radius="all"
                      />
                    </fieldset>
    
                    <fieldset>
                      <label htmlFor="name">Cardholder Name:</label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder={TITULAR_NAME_PLACEHOLDER}
                        defaultValue={creditCardInfo?.name || ''}
                        onChange={handleChange}
                        onFocus={(e) => handleFocus(e.target.name)}
                        radius="all"
                      />
                    </fieldset>
    
                    <FormGroup>
                      <fieldset>
                        <label htmlFor="expiry">available (month/year):</label>
                        <Input
                          id="expiry"
                          name="expiry"
                          type="text"
                          placeholder={DATE_PLACEHOLDER}
                          defaultValue={creditCardInfo?.expiry || ''}
                          onChange={handleChange}
                          onFocus={(e) => handleFocus(e.target.name)}
                          radius="all"
                        />
                      </fieldset>
    
                      <fieldset>
                        <label htmlFor="cvc">CVV:</label>
                        <Input
                          id="cvc"
                          name="cvc"
                          type="text"
                          placeholder={CVV_PLACEHOLDER}
                          defaultValue={creditCardInfo?.cvc || ''}
                          onChange={handleChange}
                          onFocus={(e) => handleFocus(e.target.name)}
                          radius="all"
                        />
                      </fieldset>
                    </FormGroup>
                  </InputsContent>
    
                  <CartContent>
                    <Cards
                      focused={creditCardInfo?.focused as any || ''}
                      cvc={creditCardInfo?.cvc || ''}
                      expiry={creditCardInfo?.expiry || ''}
                      name={creditCardInfo?.name || ''}
                      number={creditCardInfo?.number || ''}
                    />
                  </CartContent>
                </FormContent>
              </div>
              <SumInfo />
              <Button type="submit" isProgressive={isProgressive}>
                Finalize Paymen
              </Button>
            </Content>
          </Form>
        </Container>
      );
    




}
