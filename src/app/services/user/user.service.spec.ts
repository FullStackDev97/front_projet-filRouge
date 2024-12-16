import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';  // Adjust the path if necessary
import { User } from '../../dto/model/user';  // Adjust the path if necessary
import { environment } from '../../../environments/environment';  // Adjust the path if necessary
import { HttpHeaders } from '@angular/common/http';

fdescribe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();  // Ensures no outstanding HTTP requests are left
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all users from API via GET', () => {
    const mockUsers: User[] = [
      { id: 1, prenom: 'Victor',nom:'Emilio',email:'vemilio@gmail.com',
        motDePasse:"1234",numeroTelephone:656779985,adresse:'Paris' },
      { id: 1, prenom: 'Maikol',nom:'Sensua',email:'maikols@gmail.com',
        motDePasse:"1234",numeroTelephone:701152058,adresse:'Gentilly' }
    ];

    service.getAllUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`${apiUrl}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should register a new user via POST', () => {
    const newUser: User = { id: 1, prenom: 'New User' };

    service.register(newUser).subscribe(user => {
      expect(user).toEqual(newUser);
    });

    const req = httpMock.expectOne(`${apiUrl}/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(newUser);
  });

  it('should retrieve a user by id via GET', () => {
    const mockUser: User = { id: 1, prenom: 'John',nom:'Duran' };

    service.getUser(1).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${apiUrl}/users/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should create a user and return user id via POST', () => {
    const newUser: User = { id: 1, prenom: 'New User' };
    const userId = 123;

    service.createUser(newUser).subscribe(id => {
      expect(id).toBe(userId);
    });

    const req = httpMock.expectOne(`${apiUrl}/users`);
    expect(req.request.method).toBe('POST');
    req.flush(userId);
  });

  it('should update a user via PUT', () => {
    const updatedUser: User = { id: 1, prenom: 'Updated User' };

    service.updateUser(1, updatedUser).subscribe(response => {
      expect(response).toBe(1);
    });

    const req = httpMock.expectOne(`${apiUrl}/users/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(1);
  });

  it('should delete a user via DELETE', () => {
    service.deleteUser(1).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/users/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should log in a user and store token and userId in localStorage', () => {
    const mockResponse = { token: 'fake-jwt-token', userId: 1 };
    const username = 'test@test.com';
    const password = 'password';

    service.login(username, password).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(localStorage.getItem('token')).toBe('fake-jwt-token');
      expect(localStorage.getItem('userId')).toBe('1');
    });

    const req = httpMock.expectOne(`${apiUrl}/authenticate`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: username, motDePasse: password });
    req.flush(mockResponse);
  });

  it('should log out a user by removing token and userId from localStorage', () => {
    localStorage.setItem('token', 'fake-jwt-token');
    localStorage.setItem('userId', '1');

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
  });

  it('should return true if the user is logged in', () => {
    localStorage.setItem('token', 'fake-jwt-token');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return false if the user is not logged in', () => {
    localStorage.removeItem('token');
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should return the token from localStorage', () => {
    localStorage.setItem('token', 'fake-jwt-token');
    expect(service.getToken()).toBe('fake-jwt-token');
  });

  it('should return the userId from localStorage', () => {
    localStorage.setItem('userId', '1');
    expect(service.getUserId()).toBe(1);
  });

  it('should check eligibility via POST', () => {
    const mockEligibility = { eligible: true };
    const userId = 1;
    const offreId = 2;

    service.checkEligibilitie(userId, offreId).subscribe(el => {
      expect(el).toEqual(mockEligibility);
    });

    const req = httpMock.expectOne(`${apiUrl}/elegibilitie/${userId}/${offreId}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toContain('Bearer');
    req.flush(mockEligibility);
  });
});
