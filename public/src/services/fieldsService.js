
class FieldsService {

    getField(key, label, type, value, hidden, values, onchange) {
        return {
            key: key,
            label: label,
            type: type,
            value: value,
            default: value,
            values: values,
            hidden: !!hidden,
            onchange: onchange || function() {}
        }
    }

    resetFields(fields) {
        for(let field of fields) {
            field.value = field.default;
        }
    }

    getFieldsValueMap(fields) {
        let valueMap = {};
        for(let field of fields) {
            valueMap[field.key] = field.value;
        }
        return valueMap;
    }

    getFieldByKey(fields, key) {
        for(let field of fields) {
            if(field.key == key) {
                return field;
            }
        }
        return {};
    }

	setFieldOnChange(field, onchange) {
		field.onchange = onchange || function() {};
	}

}

export default new FieldsService();
