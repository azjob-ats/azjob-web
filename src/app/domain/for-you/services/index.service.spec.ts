import { TestBed } from '@angular/core/testing';
import { IndexService } from './index.service';



describe('ApiService', () => {
    let service: IndexService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [IndexService],
        });
        service = TestBed.inject(IndexService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
