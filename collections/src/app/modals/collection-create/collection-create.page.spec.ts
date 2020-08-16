import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CollectionCreatePage } from './collection-create.page';

describe('CollectionCreatePage', () => {
  let component: CollectionCreatePage;
  let fixture: ComponentFixture<CollectionCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
