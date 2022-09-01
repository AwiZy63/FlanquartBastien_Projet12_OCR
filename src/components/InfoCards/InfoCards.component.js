import { PropTypes } from 'prop-types';
import React from 'react';
import './InfoCards.style.css';
/* Importing the icons from the assets folder. */
import caloriesIcon from '../../assets/energy.svg';
import proteinsIcon from '../../assets/chicken.svg';
import carbohydratesIcon from '../../assets/apple.svg';
import lipidsIcon from '../../assets/cheeseburger.svg';

export default function InfoCards(props) {
    const { cardInfos } = props;

    /* An object that contains the properties of the card. */
    const properties = {
        Calories: { color: 'rgba(255, 0, 0, 0.1)', icon: caloriesIcon },
        Proteines: { color: 'rgba(74, 184, 255, 0.1)', icon: proteinsIcon },
        Glucides: { color: 'rgba(249, 206, 35, 0.1)', icon: carbohydratesIcon },
        Lipides: { color: 'rgba(253, 81, 129, 0.1)', icon: lipidsIcon }
    }

    /* Formatting the number to the US format for adding digit. */
    const formattedNumber = new Intl.NumberFormat('en-US')


    let k = 0;
    /* Returning map of cards informations into a components. */
    return cardInfos.map((v) => {
        k = k + 1;
        console.log(k)
        const { value, label, unit } = v;
        return (
            <div key={k} className='card-container'>
                <img className='card-icon' style={{ backgroundColor: properties[label]["color"] }} src={properties[label]["icon"]} alt={`${label} icon`} />
                <div className="card-body">
                    <p className="card-quantity">{formattedNumber.format(value)}{unit}</p>
                    <p className="card-label">{label}</p>
                </div>
            </div>
        )
    });
}

/* A validation of the props. */
InfoCards.propTypes = {
    cardInfos: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        unit: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired
    }).isRequired).isRequired,
}