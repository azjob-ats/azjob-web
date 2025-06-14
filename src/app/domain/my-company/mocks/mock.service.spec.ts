import { TestBed } from '@angular/core/testing';
import { MockService } from './index.mock';


describe('ApiService', () => {
    let service: MockService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MockService],
        });
        service = TestBed.inject(MockService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
