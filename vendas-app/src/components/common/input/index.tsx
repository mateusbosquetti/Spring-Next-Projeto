import React, { InputHTMLAttributes } from "react";
import { formatReal } from "pasta/util/money";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    onChange?: (value: string) => void;
    label: string;
    columnClasses?: string;
    currency?: boolean;
    value?: string;
}

export const Input: React.FC<InputProps> = ({
    onChange,
    label,
    columnClasses,
    id,
    currency,
    value,
    ...inputProps
}) => {

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.target.value;

        if (currency) {
            inputValue = formatReal(inputValue); // Formata como dinheiro
        }

        if (onChange) {
            onChange(inputValue); // Atualiza o estado com o valor formatado
        }
    };

    return (
        <div className={`field column ${columnClasses}`}>
            <label className="label" htmlFor={id}>{label}</label>
            <div className="control">
                <input
                    className="input"
                    id={id}
                    {...inputProps}
                    value={value} // Atualiza o valor do campo
                    onChange={onInputChange}
                />
            </div>
        </div>
    );
};
