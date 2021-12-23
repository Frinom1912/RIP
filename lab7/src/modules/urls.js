class Urls {
    constructor() {
        this.url = 'http://localhost:8000/';
    }

    stocks() {
        return `${this.url}hotel/`
    }

    stock(id) {
        return `${this.url}hotel/${id}/`
    }
}

export const urls = new Urls()