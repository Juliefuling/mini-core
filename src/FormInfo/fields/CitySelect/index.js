import {CityEnum, CitySelect as CommonCitySelect, withPopup} from '../../../Common';
import {withDecoratorList} from '@kne/react-form-antd-taro';
import React, {useMemo} from "react";
import {View} from "@tarojs/components";
import classnames from "classnames";
import style from "../../style.module.scss";

const CitySelectInner = (props) => {
    return <CommonCitySelect {...props} hasSafeArea
                             className={classnames(style['city-select-container'], props.className)}
                             defaultValue={props.value || []}/>
}

const CitySelect = withDecoratorList(({render, placeholder, showPopup, value, valueType}) => {
    const label = useMemo(() => {
        if (!value || !value?.[0]) {
            return '';
        }
        return <View className={"ellipsis"} split="," size={0}>{(value || []).map((item, index) => {
            const targetValue = valueType === 'all' ? item.value : item;
            return <>
                <CityEnum key={targetValue} name={targetValue}/>{index !== value.length - 1 && "，"}
            </>
        })}</View>
    }, [value, valueType]);
    return render({
        label, value: (value || []), placeholder, onClick: showPopup
    });
})(withPopup(CitySelectInner));

export default CitySelect;
