import { Injectable } from '@angular/core'
import  { ICategory } from './category.model'

@Injectable()
export class CategoryService {
    getCategory(categoryUrl:string):ICategory {
        return CATEGORIES.find(category => category.categoryUrl === categoryUrl)
    }

    getAllCategories(){
        return CATEGORIES
    }
}

const CATEGORIES:ICategory[] = [
        {
            id: 1,
            name: 'Email',
            categoryUrl: 'email',
            imageUrl: 'images/microsoft-outlook-96.png'
        },
        {
            id: 2,
            name: 'VPN',
            categoryUrl: 'vpn',
            imageUrl: 'images/pulse-secure-small.png'

        },
        {
            id: 3,
            name: 'Internet',
            categoryUrl: 'internet',
            imageUrl: 'images/wifi-96.png'
        },
        {
            id: 4,
            name: 'Skype',
            categoryUrl: 'skype',
            imageUrl: 'images/skype-96.png'
        },
        {
            id: 5,
            name: 'Lockouts',
            categoryUrl: 'lockouts',
            imageUrl: 'images/password-96.png'
        },
        {
            id: 6,
            name: 'Microsoft Office',
            categoryUrl: 'microsoft_office',
            imageUrl: 'images/office-96.png'
        },
        {
            id: 7,
            name: 'Adobe',
            categoryUrl: 'adobe',
            imageUrl: 'images/adobe-creative-cloud-96.png'
        },
        {
            id: 8,
            name: 'Antivirus',
            categoryUrl: 'antivirus',
            imageUrl: 'images/symantec-96.png'
        },
        {
            id: 9,
            name: 'Mobile Devices',
            categoryUrl: 'mobile_devices',
            imageUrl: 'images/smartphone-tablet-filled-100.png'
        },
        {
            id: 10,
            name: 'Fiori',
            categoryUrl: 'fiori',
            imageUrl: 'images/sap-96.png'
        },
        {
            id: 11,
            name: 'Browser Issues',
            categoryUrl: 'browser_issues',
            imageUrl: 'images/chrome-96.png'
        },
        {
            id: 12,
            name: 'Windows',
            categoryUrl: 'windows',
            imageUrl: 'images/windows-10-96.png'
        },
        {
            id: 12,
            name: 'Mac',
            categoryUrl: 'mac',
            imageUrl: 'images/mac-client-96.png'
        }
]
