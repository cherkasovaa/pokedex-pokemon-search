import { Button } from '@/components/Button';
import { SearchInputField } from '@/components/SearchInputField';
import { storage } from '@/services/Storage';
import type { SearchBarProps, SearchInputState } from '@/types/interfaces';
import { Component, type ChangeEvent, type FormEvent } from 'react';

export class SearchBar extends Component<SearchBarProps, SearchInputState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(): void {
    const savedSearchTerm = storage.getSearchTerm();

    if (savedSearchTerm) {
      this.setState({ value: savedSearchTerm });

      if (this.props.onSearch) {
        this.props.onSearch(savedSearchTerm);
      }
    }
  }

  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const searchTerm = this.state.value.trim();
    storage.setSearchTerm(searchTerm);

    if (this.props.onSearch) {
      this.props.onSearch(searchTerm);
    }

    this.setState({ value: '' });
  }

  render() {
    return (
      <form
        className="py-2 grid grid-cols-1 place-items-end sm:grid-cols-[1fr_auto] gap-6"
        onSubmit={this.handleSubmit}
      >
        <SearchInputField
          onChange={this.handleChange}
          value={this.state.value}
        />
        <Button
          content="Search"
          type="submit"
          className="border-gray-300 hover:bg-gray-200 text-gray-300 hover:text-gray-800"
        />
      </form>
    );
  }
}
