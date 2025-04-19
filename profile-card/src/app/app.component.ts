import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

interface SocialLink {
  platform: string;
  url: string;
}

interface CustomSection {
  title: string;
  content: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    CommonModule,
    MatExpansionModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = 'Deniz';
  age = 20;
  description = 'Hello World! 😊🚀';
  profileImageUrl: string | null = null;

  editMode = {
    name: false,
    age: false,
    description: false,
  };

  socialLinks: SocialLink[] = [];
  newSocialLink: SocialLink = { platform: '', url: '' };
  socialPanelExpanded = false;

  customSections: CustomSection[] = [];
  newSection: CustomSection = { title: '', content: '' };
  showAddSection = false;

  toggleEdit(field: keyof typeof this.editMode): void {
    this.editMode[field] = !this.editMode[field];
    for (const key in this.editMode) {
      if (key !== field)
        this.editMode[key as keyof typeof this.editMode] = false;
    }
  }

  addSocialLink(): void {
    const { platform, url } = this.newSocialLink;
    if (![platform, url].every((val) => val.trim())) return;

    this.socialLinks.push({ platform, url });
    this.resetNewLink();
  }

  removeSocialLink(link: SocialLink): void {
    this.socialLinks = this.socialLinks.filter((l) => l !== link);
  }

  addCustomSection(): void {
    const { title, content } = this.newSection;
    if (!title.trim() || !content.trim()) return;

    this.customSections.push({ title, content });
    this.resetNewSection();
    this.showAddSection = false;
  }

  removeSection(index: number): void {
    if (index > -1) this.customSections.splice(index, 1);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => (this.profileImageUrl = reader.result as string);
    reader.readAsDataURL(file);
  }

  private resetNewLink(): void {
    this.newSocialLink = { platform: '', url: '' };
  }

  private resetNewSection(): void {
    this.newSection = { title: '', content: '' };
  }
}
