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

import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {DropdownButtonInterface} from 'common';
import {ButtonInterface} from 'common';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import {PlacementArray} from '@ng-bootstrap/ng-bootstrap/util/positioning';
import {LanguageStore} from '../../store/language/language.store';

@Component({
    selector: 'scrm-dropdown-button',
    templateUrl: './dropdown-button.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownButtonComponent implements OnInit {
    @Input() config: DropdownButtonInterface;
    @Input() disabled = false;
    @Input() autoClose: boolean | 'outside' | 'inside' = true;

    constructor(public language: LanguageStore) {
    }

    isDropdown(item: ButtonInterface): boolean {
        if (!item) {
            return false;
        }
        return 'items' in item;
    }

    click(onClick: Function, dropdown: NgbDropdown): void {
        onClick();
        dropdown.close();
    }

    close(dropdown: NgbDropdown): void {
        dropdown.close();
    }

    ngOnInit(): void {
        if (this.config && !this.config.placement) {
            this.config.placement = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
        }
    }

    getPlacement(): PlacementArray {
        if (this.config && !this.config.placement) {
            return ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
        }
        return this.config.placement;
    }

}
