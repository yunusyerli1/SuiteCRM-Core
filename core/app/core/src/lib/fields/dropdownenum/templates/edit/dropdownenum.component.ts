/**
 * SuiteCRM is a customer relationship management program developed by SalesAgility Ltd.
 * Copyright (C) 2021 SalesAgility Ltd.
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY SALESAGILITY, SALESAGILITY DISCLAIMS THE
 * WARRANTY OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * In accordance with Section 7(b) of the GNU Affero General Public License
 * version 3, these Appropriate Legal Notices must retain the display of the
 * "Supercharged by SuiteCRM" logo. If the display of the logos is not reasonably
 * feasible for technical reasons, the Appropriate Legal Notices must display
 * the words "Supercharged by SuiteCRM".
 */

import {Component, ElementRef, ViewChild} from '@angular/core';
import {DataTypeFormatter} from '../../../../services/formatters/data-type.formatter.service';
import {BaseEnumComponent} from '../../../base/base-enum.component';
import {LanguageStore} from '../../../../store/language/language.store';
import {FormGroup} from '@angular/forms';
import {deepClone, Option} from 'common';
import {FieldLogicManager} from '../../../field-logic/field-logic.manager';

@Component({
    selector: 'scrm-dropdownenum-edit',
    templateUrl: './dropdownenum.component.html',
    styleUrls: []
})
export class DropdownEnumEditFieldComponent extends BaseEnumComponent {

    @ViewChild('selectElement') selectElement: ElementRef;

    formGroup: FormGroup;
    elementWidth: number;

    constructor(protected languages: LanguageStore, protected typeFormatter: DataTypeFormatter, protected logic: FieldLogicManager) {
        super(languages, typeFormatter, logic);
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.subscribeValueChanges();

        if (this.record && this.record.formGroup) {
            this.formGroup = this.record.formGroup
        } else {
            this.formGroup = new FormGroup({});
            this.formGroup.addControl(this.field.name, this.field.formControl);
        }
    }

    public getId(item: Option) {
        return this.field.name + '-' + item.value;
    }

    public truncateOptionLabel(options: Option[]): Option[] {
        const _options = deepClone(options);

        const elementWidth = this.selectElement?.nativeElement?.offsetWidth ?? null;
        if (!elementWidth) {
            return _options;
        }

        let textLength = Math.min(100, Math.max(35, Math.floor(elementWidth / 10)));

        return _options.map((option) => {
            if (option?.label?.length > textLength) {
                option.label = option.label.substr(0, textLength) + '...'
            }
            return option;
        });
    }
}
