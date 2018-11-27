'use strict';
import { TestBed, async } from '@angular/core/testing';
import * as Stomp from 'stompjs';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/primeng';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import { of as observableOf,  Observable } from 'rxjs';
import {
  ActivatedRoute,
  Route,
  ActivatedRouteSnapshot,
  UrlSegment,
  Params,
  Data,
  ParamMap
} from '@angular/router';
import { StorageServiceModule, SESSION_STORAGE } from 'angular-webstorage-service';
import { JL } from 'jsnlog';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Component, Input } from '@angular/core';

import { HomeLayoutCmp } from './home-layout.component';
import { FooterGlobal } from '../platform/footer/footer-global.component';
import { HeaderGlobal } from '../platform/header/header-global.component';
import { Link } from '../platform/link.component';
import { Paragraph } from '../platform/content/paragraph.component';
import { ComboBox } from '../platform/form/elements/combobox.component';
import { KeysPipe } from '../../pipes/app.pipe';
import { Value } from '../platform/form/elements/value.component';
import { SelectItemPipe } from '../../pipes/select-item.pipe';
import { TooltipComponent } from '../platform/tooltip/tooltip.component';
import { CustomHttpClient } from '../../services/httpclient.service';
import { WebContentSvc } from '../../services/content-management.service';
import { PageService } from '../../services/page.service';
import { LoaderService } from '../../services/loader.service';
import { ConfigService } from '../../services/config.service';
import { AuthenticationService } from '../../services/authentication.service';
import { BreadcrumbService } from '../platform/breadcrumb/breadcrumb.service';
import { LayoutService } from '../../services/layout.service';
import { LoggerService } from '../../services/logger.service';
import { SessionStoreService, CUSTOM_STORAGE } from '../../services/session.store';
import { AppInitService } from '../../services/app.init.service'
import { SvgComponent } from '../platform/svg/svg.component';
import { Button } from '../platform/form/elements/button.component';
import { ActionDropdown, ActionLink } from '../platform/form/elements/action-dropdown.component';
import { InputLabel } from '../platform/form/elements/input-label.component';
import { Image } from '../platform/image.component';
import { setup, TestContext } from '../../setup.spec';
import { configureTestSuite } from 'ng-bullet';

@Component({
  template: '<div></div>',
  selector: 'nm-panelMenuSub'
})
export class NmPanelMenuSub {
  @Input() item: any;
  @Input() expanded: boolean;
}

@Component({
  template: '<div></div>',
  selector: 'nm-panelMenu'
})
export class NmPanelMenu {
  @Input() model: any[];
  @Input() style: any;
  @Input() styleClass: string;
  @Input() multiple: boolean = true;  
}

class MockAuthenticationService {
  logout() {
    const logout = 'testing';
    return observableOf(logout);
  }
}
class MockPageService {
    public config$: Subject<any>;
  
    constructor() {
      this.config$ = new Subject();
    }
  
    loadFlowConfig(a) {}
    loadDefaultPageForConfig(a) {}
    logError(a) {
      this.config$.next(a);
    }
    traverseFlowConfig(a, b) {}
  }
class MockLayoutService {
  public layout$: Subject<any>;

  constructor() {
    this.layout$ = new Subject<any>();
  }

  parseLayoutConfig(layout) {
    this.layout$.next(layout);
  }

  getLayout() {}
}

class MockLoggerService {
  debug() { }
  info() { }
  error() { }
}

export class MockActivatedRoute implements ActivatedRoute {
  snapshot: ActivatedRouteSnapshot;
  url: Observable<UrlSegment[]>;
  params: Observable<Params>;
  queryParams: Observable<Params>;
  fragment: Observable<string>;
  outlet: string;
  component: any;
  routeConfig: Route;
  root: ActivatedRoute;
  parent: ActivatedRoute;
  firstChild: ActivatedRoute;
  children: ActivatedRoute[];
  pathFromRoot: ActivatedRoute[];
  data: any = {
    value: {
      layout: 'test'
    }
  };
  paramMap: Observable<ParamMap>;
  queryParamMap: Observable<ParamMap>;
}

class MockSTOMPService {
  configure() {}
  try_connect() {
    return new Promise((resolve, reject) => {
      resolve('abcd');
    });
  }
  disconnect() {}
}

let layoutService, activatedRoute, pageService;

const declarations= [
    HomeLayoutCmp,
    FooterGlobal,
    HeaderGlobal,
    Link,
    Paragraph,
    ComboBox,
    KeysPipe,
    Value,
    SelectItemPipe,
    TooltipComponent,
    SvgComponent,
    Button,
    ActionDropdown,
    InputLabel,
    Image,
    ActionLink,
    NmPanelMenu,
    NmPanelMenuSub
  ];
  const providers = [
    { provide: AuthenticationService, useClass: MockAuthenticationService },
    { provide: LayoutService, useClass: MockLayoutService },
    { provide: ActivatedRoute, useClass: MockActivatedRoute },
    { provide: PageService, useClass: MockPageService },
    { provide: CUSTOM_STORAGE, useExisting: SESSION_STORAGE },
    { provide: 'JSNLOG', useValue: JL },
    {provide: LoggerService, useClass: MockLoggerService},
    CustomHttpClient,
    WebContentSvc,
    LoaderService,
    ConfigService,
    BreadcrumbService,
    SessionStoreService,
    AppInitService
  ];
  const imports = [
    RouterTestingModule,
    FormsModule,
    DropdownModule,
    HttpClientModule,
    HttpModule,
    StorageServiceModule,
    AngularSvgIconModule
  ];

let fixture, hostComponent;
describe('HomeLayoutCmp', () => {

  configureTestSuite(() => {
    setup( declarations, imports, providers);
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLayoutCmp);
    hostComponent = fixture.debugElement.componentInstance;
    layoutService = TestBed.get(LayoutService);
    activatedRoute = TestBed.get(ActivatedRoute);
    pageService = TestBed.get(PageService);
  });

  it('should create the app',  async(() => {
    expect(hostComponent).toBeTruthy();
  }));

  // it('ngOnInint() should get layout from layout service',  async(() => {
  //   spyOn(layoutService, 'getLayout').and.callThrough();
  //   hostComponent.ngOnInit();
  //   const layout = {
  //     topBar: {
  //       branding: 'test',
  //       headerMenus: 'tHeaderMenus'
  //     },
  //     menu: [],
  //     footer: 'FooterConfig',
  //   };
  //   layoutService.parseLayoutConfig(layout);
  //   expect(layoutService.getLayout).toHaveBeenCalled();
  // }));

  // it('ngOnInint() should not get layout from layout service',  async(() => {
  //   spyOn(layoutService, 'getLayout').and.callThrough();
  //   activatedRoute.data['value']['layout'] = null;
  //   hostComponent.ngOnInit();
  //   const layout = {
  //     topBar: {
  //       branding: 'test',
  //       headerMenus: 'tHeaderMenus'
  //     },
  //     menu: [],
  //     footer: 'FooterConfig',
  //   };
  //   layoutService.parseLayoutConfig(layout);
  //   expect(layoutService.getLayout).not.toHaveBeenCalled();
  // }));

  // it('ngOnInint() should update the class properties',  async(() => {
  //   hostComponent.ngOnInit();
  //   const layout: any = {
  //     topBar: {
  //       branding: 'test',
  //       headerMenus: 'tHeaderMenus'
  //     },
  //     menu: [],
  //     footer: 'FooterConfig',
  //   };
  //   layoutService.parseLayoutConfig(layout);
  //   const res: any = 'test';
  //   expect(hostComponent.branding).toEqual(res);
  //   expect(hostComponent.topMenuItems).toEqual(layout.topBar.headerMenus);
  // }));

  // it('ngOnInint() should not update the class properties',  async(() => {
  //   hostComponent.ngOnInit();
  //   const layout = {};
  //   layoutService.parseLayoutConfig(layout);
  //   const res: any = 'test';
  //   expect(hostComponent.branding).not.toEqual(res);
  // }));

  // it('ngOnInint() should not update the class properties if layout is null',  async(() => {
  //   hostComponent.ngOnInit();
  //   const layout = {};
  //   layoutService.parseLayoutConfig();
  //   const res: any = 'test';
  //   expect(hostComponent.branding).not.toEqual(res);
  // }));

  it('toggelSideNav should update collapse property',  async(() => {
    hostComponent.collapse = true;
    hostComponent.toggelSideNav();
    expect(hostComponent.collapse).toEqual(false);
  }));

  it('get activeTheme should return activeTheme property',  async(() => {
    hostComponent.activeTheme = 'test';
    hostComponent.activeTheme = 'test';
    expect(hostComponent.activeTheme).toEqual('test');
  }));

  it('on_next() should call pageService.traverseFlowConfig()',  async(() => {
    const test1 = JSON.stringify({
      result: [
        {
          result: {
            value: {
              path: 'test/t'
            }
          }
        }
      ]
    });
    const test = {
      body: test1
    };
    spyOn(pageService, 'traverseFlowConfig').and.callThrough();
    hostComponent.on_next(test);
    expect(pageService.traverseFlowConfig).toHaveBeenCalled();
  }));

});
